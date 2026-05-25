const favContainer = document.getElementById("favContainer");
const loadFavorites = async () => {
  let fav = JSON.parse(localStorage.getItem("favorites")) || [];
  if (fav.length === 0) {
    favContainer.innerHTML = `<p>No favorites yet!    </p>`;
    return;
  } const productPromises = fav.map(id => fetch(`https://dummyjson.com/products/${id}`).then(res => res.json()));
  const products = await Promise.all(productPromises);
  favContainer.innerHTML = products.map(p => ` 
      <div class="card">
       <img src="${p.thumbnail}" alt="${p.title}">
        <h3>${p.title}</h3> 
        <p>₹${p.price}</p> 
        <a href="product.html?id=${p.id}" class="btn">View</a> 
        </div> `)
    .join("");
};
loadFavorites(); 