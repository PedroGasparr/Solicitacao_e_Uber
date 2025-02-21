document.getElementById('transporteForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyY7y3kWshoxV0W7NCfX3wT07y2TMW7YE66t97aIRmtVAvC2AJFtWJ7tlsQCRBVRzAL/exec';

    const formData = new FormData(this);
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(jsonObject),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            alert('Respostas enviadas com sucesso!');
            document.getElementById('transporteForm').reset();
        } else {
            alert('Erro ao enviar o formulário. Tente novamente.');
        }
    })
    .catch(error => console.error('Erro:', error));
});
