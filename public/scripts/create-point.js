function populateUfs(){
   const ufSelect = document.querySelector("select[name=uf]")

   fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
   .then((res)=>{return res.json()})
   .then(states => {
       for (const state of states){
           ufSelect.innerHTML+=`<option value="${state.id}">${state.nome}</option>`
       }

   })
}

populateUfs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url=`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML ="<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then((res)=>{return res.json()})
    .then(cities => {
        for (const city of cities){
            citySelect.innerHTML+=`<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
 
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// ítens de coleta
//pegar todos os lis
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //adicionando ou removendo class com javascript
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    

    //verificar se existem itens selecionados e verificar quais são caso exista
    //pegar selecionados
    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item === itemId
        return itemFound
    })

    //caso esteja selecionado, retirar seleção.
    if(alreadySelected >= 0){
        //retira seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId//false
            return itemIsDifferent
        })

        selectedItems = filteredItems

    }else{
        //se não estiver selecionado, selecionar
        selectedItems.push(itemId)

    }

    //atualizar o campo com itens selecionados
    collectedItems.value = selectedItems

}