// const categoryList = document.getElementById("categoryList"); 
// const categoryProducts = document.getElementById("categoryProducts"); 
// const loadCategories = async () => { 
//   const res = await fetch("https://dummyjson.com/products/categories"); 
//   const categories = await res.json(); 
//   categoryList.innerHTML = categories.map(cat => ` 
//     <li><button class="catbtn">${cat}</button></li> `)
//     .join("");
//     document.querySelectorAll(".catbtn").forEach(btn => { 
//       btn.addEventListener("click", () => loadCategoryProducts(btn.textContent)); 
//     });
//    };  

//    const loadCategoryProducts = async (category) => { 
//     const res = await fetch(`https://dummyjson.com/products/categories/${category}`); const data = await res.json();
//      categoryProducts.innerHTML = data.products.map(p => ` <div class="card"> 
//       <img src="${p.thumbnail}" alt="${p.title}"> 
//       <h3>${p.title}</h3> 
//       <p>₹${p.price}</p>
//        <a href="product.html?id=${p.id}" class="btn">View</a> </div> `)
//        .join(""); 
//       }; 
//       loadCategories(); 

      


const categoryList = document.getElementById("categoryList");
const categoryProducts = document.getElementById("categoryProducts");

// LOAD CATEGORIES
const loadCategories = async () => {

  try {

    const res = await fetch(
      "https://dummyjson.com/products/categories"
    );

    const categories = await res.json();

    categoryList.innerHTML = categories.map(cat => `
      
      <li>
        <button class="catbtn" data-slug="${cat.slug}">
          ${cat.name}
        </button>
      </li>

    `).join("");

    // BUTTON EVENTS
    document.querySelectorAll(".catbtn").forEach(btn => {

      btn.addEventListener("click", () => {

        const slug = btn.dataset.slug;

        loadCategoryProducts(slug);
      });

    });

  } catch (error) {

    categoryList.innerHTML = `
      <p>Failed to load categories</p>
    `;
  }
};

// LOAD PRODUCTS BY CATEGORY
const loadCategoryProducts = async (category) => {

  try {

    // FIXED API URL
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );

    const data = await res.json();

    categoryProducts.innerHTML = data.products.map(p => `
      
      <div class="card">

        <img src="${p.thumbnail}" alt="${p.title}">

        <h3>${p.title}</h3>

        <p>₹${p.price}</p>

        <a href="product.html?id=${p.id}" class="btn">
          View
        </a>

      </div>

    `).join("");

  } catch (error) {

    categoryProducts.innerHTML = `
      <p>Failed to load products</p>
    `;
  }
};

loadCategories();