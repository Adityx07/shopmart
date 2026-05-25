const container = document.getElementById("productDetails");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const loadProduct = async () => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    const product = await res.json();
    container.innerHTML = ` <div class="product-card"> 
 <img src="${product.thumbnail}" alt="${product.title}"> 
 <div> 
 <h2>${product.title}</h2> 
 <p>${product.description}</p> 
 <p><b>Brand:</b> ${product.brand}</p> 
 <p><b>Category:</b> ${product.category}</p>
  <h3>Price: ₹${product.price}</h3>
   <button onclick="addToFav(${product.id})">
    💖Favorites</button> </div> </div> `;
  }
  catch {
    container.innerHTML = `<p Add to class="error">Product not found!</p>`;
  }
};

const addToFav = (id) => { 
  let fav = JSON.parse(localStorage.getItem("favorites")) || []; 
  if (!fav.includes(id)) { fav.push(id); 
    localStorage.setItem("favorites", JSON.stringify(fav)); 
    alert("Added to Favorites    ");
   } else { alert("Already in Favorites!"); 
   } 
  }; 
  loadProduct(); 
