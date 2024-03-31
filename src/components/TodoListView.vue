<script setup>
import { ref } from "vue";
import { statuses } from '../const/statuses';
import "../assets/listview.css"

let items = ref( JSON.parse(localStorage.getItem("items")) || [] );
let inputContent = ref();
let inputLimit = ref();
let inputState = ref();
let errMsg = ref("");
let pushing_bar = ref("");

//編集を押したら
function onEdit(id){ 
    let isOnEditOther = false;
    items.value.map((item) =>{
        if(item.onEdit){
            isOnEditOther = true;
            return;
        }
    });
    if(isOnEditOther){
        errMsg.value = "他に編集中のタスクがあります。"
        isErr.value = true;
        return;
    }
    inputContent.value = items.value[id].content;
    inputLimit.value = items.value[id].limit;
    inputState.value - items.value[id].state;
    items.value[id].onEdit = true;
    pushing_bar.value = id;//削除が表示
    document.getElementById('th-state-id').style.display = 'none';
    document.getElementById('th-edit-id').style.display = 'none';


}
let isErr = ref(false);
function onUpdate(id){
    if(inputContent.value== "" || inputLimit.value == ""){
        errMsg.value= "タスクの内容と期限を入力してください。"
        isErr.value = true;
        return;
    }
    const newItem = {

        id:id,
        content: inputContent.value,
        limit: inputLimit.value,
        state: inputState.value,
        onEdit: false,
    }
    items.value.splice(id, 1, newItem);
    localStorage.setItem("items", JSON.stringify(items.value));
    isErr.value = false; 
    pushing_bar.value = false;
    document.getElementById('th-state-id').style.display = 'table-cell';
    document.getElementById('th-edit-id').style.display = 'table-cell';
}
let isShowModal = ref(false);
let deleteItemId = ref('');

//削除を押したら
function showDeleteModal (id) {
    isShowModal.value = true; //削除するかどうかの選択肢が表示
    deleteItemId = id
}

function onDeleteItem (){
    items.value.splice(deleteItemId, 1);
    isShowModal.value = false;
    items.value = items.value.map((item, index)=> ({
        id: index,
        content: item.content,
        limit: item.limit,
        state: item.state,
        onEdit: item.onEdit,
    }))
localStorage.setItem("items", JSON.stringify(items.value));
document.getElementById('th-state-id').style.display = 'table-cell';
document.getElementById('th-edit-id').style.display = 'table-cell';

}
function onHideModal(){
    isShowModal.value = false;
    document.getElementById('th-state-id').style.display = 'table-cell';
    document.getElementById('th-edit-id').style.display = 'table-cell';
}


</script>
<template>

<div>
    <table class="table">
        <tr>
            <th scope="col" class="th-value">内容</th>
            <th scope="col" class="th-limit">期限</th>
            <th scope="col" id="th-state-id" class="th-state">状態</th>
            <th scope="col" id="th-edit-id" class="th-edit">編集</th>
        </tr>

    <div v-if="isShowModal" class="modal-parent">
        <div class="modal-content">
            <p>削除しますか？</p>
            <button class="btn btn-danger" @click="onDeleteItem()">はい</button>
            <button class="btn btn-dark" @click="onHideModal()">キャンセル</button>
        </div>
    </div>
        <p v-if="isErr">{{ errMsg }}</p>
        <tr v-for = " item in items " :key="item.id">
            <td class="content-normal-style"><span v-if="!item.onEdit">「{{ item.content }}」</span>
            <textarea class="content-style" v-else v-model="inputContent"></textarea>
            </td>
            <td><span class="limit-style" v-if="!item.onEdit">{{ item.limit }}</span>
            <input class="limit-else-style" v-else v-model="inputLimit" type="date" />
            </td>
            <td>
            <span v-if="!item.onEdit">{{ item.state.value}} </span>
            <select class="select-position" v-else v-model="inputState">
            <option v-for="state in statuses"
            :key="state.id"
            :value="state"
            :selected="item.state == items.state"
            >
            {{ state.value }}

            </option>
            </select>
            </td>
            <td><button class="btn btn-outline-secondary btn-sm"  v-if="!item.onEdit" @click="onEdit(item.id)">編集</button>
                <button class="btn btn-outline-success complete-button" v-else @click="onUpdate(item.id)">完了</button>
            </td>
            <td><button v-if="pushing_bar === item.id" class="btn btn-outline-danger btn-sm button-position"  @click="showDeleteModal(item.id)">削除</button></td>
            
        </tr>
    </table>

</div>


</template>