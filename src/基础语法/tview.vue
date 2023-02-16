<template>
    <p :class="isred">{{ names }}</p>
    <p>test</p>

</template>

<script>
import { reactive } from 'vue';


export default {
    name: "",
    setup() {
        const data = reactive({
            name: "ssss"
        })

        const names = "names"
        const isred = "red"
        return {
            data,
            names,
            isred
        }
    }
}

</script>
<style>
.red {
    color: red;
}
.blue{
    color: blue;
}
</style>
