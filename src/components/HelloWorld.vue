<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-22 15:29:31
 * @LastEditors: fei
 * @LastEditTime: 2021-06-28 14:33:53
-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{newMessage}}
    {{student.name}}
    {{student.age}}
    {{student.class}}

    {{date}}

    {{count}}
    {{students}}
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import tableList from "@/composables/tableList";
// import { Options, Vue } from 'vue-class-component';

// @Options({
//   props: {
//     msg: String
//   }
// })
// export default class HelloWorld extends Vue {
//   msg!: string
// }
interface Student{
  name: string,
  age: number,
  class: string
}

export default defineComponent({
    props: {
      msg: String,
      callback: {
        type: Function as PropType<() => void>,
        required: true
      },
      student: {
        type:Object as PropType<Student>,
        required:true
      }
    },
    data () {
      return {
        message: 'Vue3 code style'
      }
    },
    setup(props){
      // const { student } = toRefs(props);
      console.log(props.student)
      const { date, students } = tableList(props.student as Student);
      return {
        date, 
        students
      }
    },
    computed:{
      newMessage(): string{
        return this.message.split("").reverse().join("");
      }
    }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
