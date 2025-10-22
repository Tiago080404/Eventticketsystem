package com.eventticketsystem.eventticketsystem.Service;

import com.eventticketsystem.eventticketsystem.Entity.*;
import com.eventticketsystem.eventticketsystem.Repository.EventsRepository;
import com.eventticketsystem.eventticketsystem.Repository.TicketRepository;
import com.eventticketsystem.eventticketsystem.Repository.TicketTransferRepository;
import com.eventticketsystem.eventticketsystem.Repository.UserRepository;
import com.eventticketsystem.eventticketsystem.dto.BuyTicketRequest;
import com.eventticketsystem.eventticketsystem.dto.TicketTransferReply;
import com.eventticketsystem.eventticketsystem.dto.TicketTransferRequest;
import com.eventticketsystem.eventticketsystem.dto.TransferNotification;
import jakarta.transaction.Transaction;
import net.glxn.qrgen.QRCode;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final EventsRepository eventsRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final TicketTransferRepository ticketTransferRepository;

    public TicketService(TicketRepository ticketRepository, EventsRepository eventsRepository, UserRepository userRepository, EmailService emailService, TicketTransferRepository ticketTransferRepository) {
        this.ticketRepository = ticketRepository;
        this.eventsRepository = eventsRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.ticketTransferRepository = ticketTransferRepository;
    }

    public List<Tickets> getTicketsByUserEmail(String email) {
        return ticketRepository.findByUserEmail(email);
    }

    public Events buyTicket(String name, BuyTicketRequest request) {
        Events boughtTicket = eventsRepository.findById(name)
                .orElseThrow(() -> new RuntimeException("Event not found:" + name));

        if (boughtTicket.getAvailabletickets() < request.getAmount()) {
            throw new RuntimeException("Not enough Tickets to buy that amount for this event");
        }

        if (boughtTicket.getPrice() * request.getAmount() > request.getMoneypaid()) {
            throw new RuntimeException("Not enough money for this event");
        }
        boughtTicket.setAvailabletickets(boughtTicket.getAvailabletickets() - request.getAmount());

        String uuid = UUID.randomUUID().toString();

        User userEntity = userRepository.findByEmail(request.getUser())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Tickets tickets = new Tickets();
        tickets.setEvents(boughtTicket); // ist ja das event entity
        tickets.setUser(userEntity); // muss user repo anlegen um ganzen user zu bekommen
        tickets.setQuantity(request.getAmount());
        tickets.setPurchased_at(LocalDateTime.now());
        tickets.setTicket_UUID(uuid);
        ticketRepository.save(tickets);

        ByteArrayOutputStream stream = QRCode.from(uuid).withSize(255, 255).stream();
        byte[] qrBytes = stream.toByteArray();
        ByteArrayResource qrAttachment = new ByteArrayResource(qrBytes);

        String subject = "Ticketkauf bestätigt für ";
        String text = "Hallo,\n\nDu hast " +
                " Ticket(s) für das Event '\n" +
                boughtTicket.getName() + "am:" + boughtTicket.getDate();


        try {
            emailService.sendMailWithAttachment(request.getUser(), subject, text, "ticket.png", qrAttachment);
        } catch (Exception e) {
            System.err.println("Email konnte nicht gesendet werden: " + e.getMessage());
        }
        eventsRepository.save(boughtTicket);
        return boughtTicket;
    }

    //weil dto hat felder die nicht immer beoetigt werde
    @Transactional
    public ResponseEntity<?> ticketTransfer(TicketTransferRequest ticketTransferRequest) {
        try {
            if( checkIfTransferPending(ticketTransferRequest.getTicketId())){
                Map<String,Object> response = new HashMap<>();
                response.put("message","cant transfer because one transfer for this ticket is still open");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            Tickets tickets = ticketRepository.findById(ticketTransferRequest.getTicketId())
                    .orElseThrow(() -> new RuntimeException("Ticket not found"));
            User oldUser = userRepository.findByEmail(ticketTransferRequest.getOldUserEmail())
                    .orElseThrow(() -> new RuntimeException("User who wants to transfer that ticket not found!"));
            User newUser = userRepository.findByEmail(ticketTransferRequest.getNewUserEmail())
                    .orElseThrow(() -> new RuntimeException("User to get the Ticket not found!"));

            //alles in die entity danach saven repo
            //vlllt mit einem if das man das dann nicht setzt das feld olduser falls auf success oder so gestellt wird
            TransferTicket transferTicket = new TransferTicket();
            transferTicket.setTransferStatus(TransferStatus.Pending);
            transferTicket.setFromUser(oldUser);
            transferTicket.setToUser(newUser);
            transferTicket.setTransferDate(LocalDateTime.now());
            transferTicket.setTicketId(ticketTransferRequest.getTicketId());

            ticketTransferRepository.save(transferTicket);

            //!!!!!!! email schreiben, dass der Benutzter ein Transfer Request bekommen hat
            String subject = "Tickettransfer Request";
            String text = "Hello" + ticketTransferRequest.getNewUserEmail() + "\n" +
                    "you have received a new request for a Tickettransfer." +
                    "Response to the request to get your ticket and the corresponding QRCode";
            try {
                emailService.sendMail(ticketTransferRequest.getNewUserEmail(), subject, text);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Ticket transfer got requested!");
            response.put("ticketId", tickets.getTicket_id());
            response.put("newOwnerCouldBe", newUser.getEmail());

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }


    public ResponseEntity<?> replyTicketTransfer(TicketTransferReply ticketTransferReply) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String loggedInUser = authentication.getName();

            TransferTicket transferTicket = ticketTransferRepository.getById(ticketTransferReply.getTransferId());
            System.out.println(loggedInUser+transferTicket.getToUser().getEmail());
            if(!loggedInUser.equals(transferTicket.getToUser().getEmail())){
                Map<String,String> response = new HashMap<>();
                response.put("message","Logged in user does not matched to User");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            if (transferTicket.getTransferStatus() == TransferStatus.transfered || transferTicket.getTransferStatus() == TransferStatus.cancelled) {
                Map<String, Object> response = new HashMap<>();
                response.put("message:", "Could not reply because Transfer got already accepted or declined");
                response.put("ticketId", transferTicket.getTicketId());
                return ResponseEntity.ok(response);
            }


            if (ticketTransferReply.getStatusChange() == TransferStatus.transfered) {
                transferTicket.setTransferStatus(TransferStatus.transfered);
                ticketTransferRepository.save(transferTicket);
                Tickets changedTicket = ticketRepository.findById(transferTicket.getTicketId())
                        .orElseThrow(() -> new RuntimeException("Ticket not found from Transfer table"));
                changedTicket.setUser(transferTicket.getToUser());
                ticketRepository.save(changedTicket);

                //email schreiben mit qrcode schicken
                ByteArrayOutputStream stream = QRCode.from(changedTicket.getTicket_UUID()).withSize(255, 255).stream();
                byte[] qrBytes = stream.toByteArray();
                ByteArrayResource qrAttachment = new ByteArrayResource(qrBytes);

                String subject = "Ticket transfered";
                String text = "Hello" + changedTicket.getUser() + "\n" +
                        "you have successfully accepted the tickettransfer" + "\n" +
                        "You can find your ticket in the attachment of the mail or in your App under ticekts!";
                try {
                    emailService.sendMailWithAttachment(changedTicket.getUser().getEmail(), subject, text, "ticket.png", qrAttachment);
                } catch (RuntimeException e) {
                    throw new RuntimeException(e);
                }

                //vllt noch eine email an den alten user das transfered wurde
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Transfer request got accepted");
                response.put("ticketId", changedTicket.getTicket_id());
                return ResponseEntity.ok(response);
            } else {
                transferTicket.setTransferStatus(TransferStatus.cancelled);
                ticketTransferRepository.save(transferTicket);

                //email an alten User das Ticket nicht transferiert wird weil user abgeheltn haty


                String subject = "Tickettransfer declined";
                String text = "Hello\n" + "your tickettransfer request got declined.\n" +
                        "The ticket of the event is still yours!";

                try {
                    emailService.sendMail(transferTicket.getFromUser().getEmail(), subject, text);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }

                Map<String, Object> response = new HashMap<>();
                response.put("message", "Transfer request got declined");
                response.put("ticketId", transferTicket.getTicketId());
                return ResponseEntity.ok(response);
            }
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error replying to transfer", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    public ResponseEntity<?> transferNotification(String email) {
        try {
            List<TransferNotification> transferNotifications = ticketTransferRepository.getTransferNotifications(email);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "All your Notificaiotns");
            response.put("data", transferNotifications);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean checkIfTransferPending(Long ticketId) {
        System.out.println("gsdkgsk");
        boolean exists = ticketTransferRepository.getTransferTicketsByTicketId(ticketId);
        if (exists) {
            System.out.println("has already a status");
            return true;
        }
        return false;
    }

}