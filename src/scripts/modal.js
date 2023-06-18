/* Desenvolva sua lógica aqui */

function openModal(){
    const button = document.querySelector('.buttonHeader');
    const modal = document.querySelector('.modal_controller');

    button.addEventListener('click', () => {
        modal.showModal();
        closeModal();
    })

};
openModal();

function closeModal(){
    const button = document.querySelector('.buttonCloseModal');
    const modal = document.querySelector('.modal_controller');

    button.addEventListener('click', () => {
        modal.close();
    })

    const buttonCan = document.querySelector('.cancelModal');
    const boxValue = document.querySelector('.boxValue');
    
    buttonCan.addEventListener('click', () => {
        boxValue.innerHTML = '';
        modal.close();
    })
};
closeModal();