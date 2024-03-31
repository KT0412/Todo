
<script setup>
import { ref } from "vue";
import { statuses } from "../const/statuses";
import '../assets/input.css'



const input = ref("");
const inputDate = ref("");

const isErrMsg = ref(false);
function onSubmitForm(){
    if(input.value=="" || inputDate.value==""){
        isErrMsg.value = true;
        event.preventDefault();

        return;

    }
    
    const items = JSON.parse(localStorage.getItem("items")) || [];

    const newItem = {
        id: items.length,
        content: input.value,
        limit: inputDate.value,
        state: statuses.NOT_START,
        onEdit: false,
    };

    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));


}



</script>

<template>
<div>
    
    <p v-show="isErrMsg">タスク・期限両方を入力してください。</p>
    <form v-on:submit="onSubmitForm">
        <label class="form-label">内容を入れてください<input class="form-control" type="text" v-model="input" placeholder="やることを入力"></label>
        <br>
        <label class="form-label">期限<input type="date" v-model="inputDate"></label>
        <input class="btn btn-primary" type="submit" value="追加">
    </form>
</div>
</template>