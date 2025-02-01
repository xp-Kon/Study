document.getElementById('scan-btn').addEventListener('click', function() {
  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector('#scanner-container')
    },
    decoder: {
      readers: ["code_128_reader"]
    }
  }, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    Quagga.start();
  });

  Quagga.onDetected(function(result) {
    const tableNumber = result.codeResult.code;
    sessionStorage.setItem('tableNumber', tableNumber);
    loadMenu();
    Quagga.stop();
  });
});

document.getElementById('submit-btn').addEventListener('click', function() {
  const selectedDishes = Array.from(document.querySelectorAll('#dish-list input:checked')).map(input => input.value);
  const tableNumber = sessionStorage.getItem('tableNumber');
  if (selectedDishes.length === 0) {
    alert('请选择至少一个菜品');
    return;
  }
  fetch('/submit-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tableNumber, dishes: selectedDishes })
  }).then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('订单提交成功');
      } else {
        alert('订单提交失败');
      }
    });
});

function loadMenu() {
  fetch('/get-menu')
    .then(response => response.json())
    .then(data => {
      const dishList = document.getElementById('dish-list');
      dishList.innerHTML = data.dishes.map(dish => `
        <li>
          <label>
            <input type="checkbox" value="${dish.id}"> ${dish.name}
          </label>
        </li>
      `).join('');
    });
}