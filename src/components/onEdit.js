import { items } from './TodoListView.vue';

export function onEdit(id) {
items.value[id].onEdit = true;
}
