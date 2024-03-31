<script setup>
import TodoInput from "./TodoInput.vue";
import TodoListView from "./TodoListView.vue";
import Vueheader from "./Vueheader.vue"
</script>
<template>
    <div class="todoApp">
        <Vueheader></Vueheader>
        <TodoInput></TodoInput>
        <TodoListView></TodoListView>
    </div>
</template>