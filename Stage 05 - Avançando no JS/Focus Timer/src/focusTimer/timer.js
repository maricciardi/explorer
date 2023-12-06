import state from './state.js'
import * as el from './elements.js'
import { reset } from './actions.js'
import { kitchenTimer } from './sounds.js'

export function updateDisplay(minutes, seconds) {
    minutes = minutes ?? /*nullish coalesing operator*/ state.minutes //se eu passar o valor de minutes ele recebe aqui, senão vai ser null, se for null ai o operador ?? está observando e vai colocar state.minutes no lugar
    seconds = seconds ?? state.seconds

    el.minutes.textContent = String(minutes).padStart(2, "0")
    el.seconds.textContent = String(seconds).padStart(2, "0")
    //padStart: preencha o começo para ficar com dois caracteres, preencha com 0
}

export function countdown() {
    clearTimeout(state.countdownId) //ao clicar várias vezes no play/pause não vai acumular mais timeouts, sem o state de countdownId a cada clique um novo setTimeout estava sendo criado, acumulando timeouts anteriores e acelerando o contador

    if(!state.isRunning) { //se o running for falso
        return
    }

    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)
    //aqui vai rodar a função:
    seconds--
    if (seconds < 0) {
        seconds = 59
        minutes--
    }

    if (minutes < 0) {
        reset()
        kitchenTimer.play()
        return
    }

    updateDisplay(minutes, seconds)

    //setTimeout(() => {}, 1000) o setTimeout executa uma função depois de determinado tempo (em milisegundos)
    state.countdownId = setTimeout(() => countdown(), 1000) //vai executar o countdown novamente a cada 1s, até clicar no pause que o state.isRunning se torna falso
}