<template>
    <div>广告页面，预渲染处理{{names}}</div>
</template>
<script>
export default {
    data(){
        return {
            names:"name123"
        }
    },
   mounted () {
       document.title = "广告"
   }
}
</script>
