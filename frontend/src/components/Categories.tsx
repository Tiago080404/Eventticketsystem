function Categories() {
  return (
    <>
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Kategorien</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Konzerte", "Sport", "Theater", "Festivals"].map((cat) => (
            <div
              key={cat}
              className=" bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow p-6 text-center hover:scale-105 transform transition cursor-pointer"
            >
              <span className="text-xl font-semibold">{cat}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default Categories;
