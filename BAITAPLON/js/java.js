const btn = document.querySelectorAll(".row button");

btn.forEach(function(button) {
    button.addEventListener("click", function(event) {
        var btnItem = event.target;  
        var product = btnItem.parentElement;
        var productImg = product.querySelector("img").src;
        var productName = product.querySelector("h4").innerText; // Lấy tên sản phẩm
        var productPrice = product.querySelector("p").innerText; // Lấy giá sản phẩm

        addcart(productImg, productName, productPrice);
    });
});

let soluong = 0;
const arrCart = [];

function addcart(productImg, productName, productPrice) {
    soluong++;

    // Tạo đối tượng sản phẩm
    let item = {
        ma: `sp${soluong}`, // Tạo mã sản phẩm tự động
        ten: productName,
        hinh: productImg,
        gia: productPrice,
        sluong: 1
    };

    arrCart.push(item); // Thêm sản phẩm vào giỏ hàng
    document.querySelector(".cartNo").innerText = soluong; // Cập nhật số lượng giỏ hàng

    // Cập nhật giỏ hàng (giả định có một bảng giỏ hàng)
    updateCartTable();
}

function updateCartTable() {
    const cartTable = document.querySelector("tbody"); // Giả định có bảng giỏ hàng
    cartTable.innerHTML = ""; // Xóa nội dung trước đó

    arrCart.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img src="${item.hinh}" alt="${item.ten}" width="50"></td>
            <td>${item.ten}</td>
            <td>${item.gia}</td>
            <td>${item.sluong}</td>
        `;
        cartTable.appendChild(tr); // Thêm hàng mới vào bảng giỏ hàng
    });
}
function addcart(productImg, productName, productPrice) {
    soluong++;

    // Tạo đối tượng sản phẩm
    let item = {
        ma: `sp${soluong}`, // Mã sản phẩm
        ten: productName,
        hinh: productImg,
        gia: productPrice,
        sluong: 1
    };

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = arrCart.findIndex(product => product.ten === productName);
    if (existingProductIndex > -1) {
        // Nếu có, tăng số lượng
        arrCart[existingProductIndex].sluong++;
    } else {
        // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
        arrCart.push(item);
    }

    document.querySelector(".cartNo").innerText = soluong; // Cập nhật số lượng giỏ hàng

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('shoppingcart', JSON.stringify(arrCart));

    // Cập nhật bảng giỏ hàng (nếu có)
    updateCartTable();
}