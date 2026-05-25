const container = document.getElementById("productContainer");
const searchBox = document.getElementById("searchBox");
const loadProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100"); 
    const data = await response.json();
    displayProducts(data.products);
  } catch (error) {
    container.innerHTML = `<p class="error">    Failed to load products. Check Internet!</p>`;
  }
};
const displayProducts = (products) => {
  container.innerHTML = products.map(product => ` 
    <div class="card"> 
    <img src="${product.thumbnail}" alt="${product.title}"> 
    <h3>${product.title}</h3> 
    <p>₹${product.price}</p> 
    <button onclick="addToFav(${product.id})">💖Add to Fav</button>
     <a href="product.html?id=${product.id}" class="btn">🔍View</a>
      </div> `)
      .join("");
}; 
 const addToFav = (id) => { 
  let fav = JSON.parse(localStorage.getItem("favorites")) || []; 
  if (!fav.includes(id)) { fav.push(id); 
    alert("Added to Favorites")
      } else {
    alert("Already in Favorites!"); 
  } localStorage.setItem("favorites", JSON.stringify(fav)); 
}; 

searchBox.addEventListener("input", async (e) => { 
  const searchTerm = e.target.value.toLowerCase(); 
  const response = await fetch(`https://dummyjson.com/products/search ?q=${searchTerm}`); 
  const data = await response.json(); 
  displayProducts(data.products); 
}); 

loadProducts(); 