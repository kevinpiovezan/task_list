(function() {
    const inputTarefa = document.querySelector('.input-tarefa');
    const btnTarefa = document.querySelector('.btn-tarefa');
    const tarefas = document.querySelector('.tarefas');

    inputTarefa.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            if (!inputTarefa.value) return
            criaTarefa(inputTarefa.value);
        }
    })
    document.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            saveTasks();
        }
    })

    function clearInput() {
        inputTarefa.value = ``;
        inputTarefa.focus();
    };

    function createLi() {
        const li = document.createElement('li');
        li.setAttribute('contenteditable', 'true');
        li.classList.add('editable');
        li.setAttribute('class', 'pendent editable');
        return li;
    }

    function eraseBtn(li) {
        li.innerText += ' ';
        const eraseBtn = document.createElement('button');
        eraseBtn.innerText = 'Apagar';
        eraseBtn.setAttribute('class', 'apagar');
        li.appendChild(eraseBtn);
    };

    function createCheck() {
        const check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        return check
    }

    function criaTarefa(inputText) {
        const li = createLi();
        const check = createCheck()
        li.innerText = inputText;
        tarefas.appendChild(li);
        eraseBtn(li);
        li.insertAdjacentElement('afterbegin', check);
        check.addEventListener('change', () => {
            if (check.checked) li.setAttribute('class', 'checked editable');
            if (!check.checked) li.setAttribute('class', 'pendent editable');
        });
        clearInput();
        saveTasks();
    };


    btnTarefa.addEventListener('click', function () {
        if (!inputTarefa.value) return
        criaTarefa(inputTarefa.value);
    });

    document.addEventListener('click', function (e) {
        const el = e.target;
        if (el.classList.contains('apagar')) {
            el.parentElement.remove();
            saveTasks();
        }
    });

    document.addEventListener('click', function (e) {
        const el = e.target;
        if (el.classList.contains('apagar-tudo')) {
            el.previousElementSibling.remove()
            localStorage.setItem('tarefas', []);
            localStorage.setItem('checked', []);
            this.location.reload()
            return false;
        }
    });
    // function isChecked() {
    //     const inputCheck = document.querySelectorAll('.checkbox');
    //     const inputCheckBox = [];
    //     for (let input of inputCheck) {
    //         let inputChecked = input.checked;
    //         inputCheckBox.push(inputChecked);
    //     }
    //     const checkedJSON = JSON.stringify(inputCheckBox);
    //     localStorage.setItem('checked', checkedJSON);
    // }

    // function adicionaCheckedSalvos() {
    //     const inputs = localStorage.getItem('checked');
    //     const inputCheckBox = JSON.parse(inputs);
    //     for (let input of inputCheckBox) {
    //         console.log(input)
    //     }}

    function saveTasks() {
        const liTarefas = tarefas.querySelectorAll('li');
        const listaDeTarefas = [];
        for (let tarefa of liTarefas) {
            let tarefaTexto = tarefa.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
            listaDeTarefas.push(tarefaTexto);
        }
        const tarefasJSON = JSON.stringify(listaDeTarefas);
        localStorage.setItem('tarefas', tarefasJSON);
    }

    function adicionaTarefasSalvas() {
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefas);
        for (let tarefa of listaDeTarefas) {
            criaTarefa(tarefa);
        }
    }
    adicionaTarefasSalvas();
})();
