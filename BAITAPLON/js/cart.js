document.addEventListener("DOMContentLoaded", function() {
    const cartBody = document.getElementById("cart-body");
    const totalPriceElement = document.getElementById("total-price");
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingcart')) || [];

    function renderCart() {
        cartBody.innerHTML = ""; // Xóa nội dung trước đó
        let totalPrice = 0; // Khởi tạo biến tổng tiền

        shoppingCart.forEach((item, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><img src="${item.hinh}" alt="${item.ten}" width="50"></td>
                <td>${item.ten}</td>
                <td>${item.gia}</td>
                <td>${item.sluong}</td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>
            `;
            cartBody.appendChild(tr); // Thêm hàng vào bảng giỏ hàng

            // Tính tổng tiền cho sản phẩm
            const price = parseFloat(item.gia.replace(/[^0-9.-]+/g, ""));
            if (!isNaN(price)) {
                totalPrice += price * item.sluong; // Cộng dồn tổng tiền
            }
        });

        // Cập nhật tổng tiền vào phần tử
        totalPriceElement.innerText ='$'+ totalPrice.toFixed(0); // Cập nhật giá trị tổng tiền
        // Cập nhật số lượng sản phẩm trên icon giỏ hàng
        document.querySelector(".cartNo").innerText = shoppingCart.reduce((total, item) => total + item.sluong, 0);

        // Cập nhật thuộc tính href của liên kết thanh toán
        document.getElementById("checkout-btn").href = `payment.html?total=${totalPrice.toFixed(2)}`;
    }

    renderCart(); // Gọi hàm renderCart để hiển thị giỏ hàng

    // Xử lý sự kiện click cho nút Remove
    cartBody.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-btn")) {
            const index = event.target.getAttribute("data-index");
            shoppingCart.splice(index, 1); // Xóa sản phẩm khỏi mảng giỏ hàng
            localStorage.setItem('shoppingcart', JSON.stringify(shoppingCart)); // Cập nhật localStorage
            renderCart(); // Cập nhật lại giỏ hàng
        }
    });
});