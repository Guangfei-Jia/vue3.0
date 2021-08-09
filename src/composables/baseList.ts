/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-30 15:06:38
 * @LastEditors: fei
 * @LastEditTime: 2021-08-04 12:03:46
 */
import { ref } from "vue";
import pageContral from "./basePage"
import { checkResponse } from "@/utils/utils";
import { deleteAction, postAction, putAction } from '@/api/axios'
interface api {
    list:string,
    add:string,
    update:string,
    delete:string,
}
export default function baseList(url: api) {
    const list = ref([]);

    const { currentPage, pageData, changeSize, changePage, changeTotal } = pageContral();
    
    //获取列表
    const getList = async (searchParam: object = {}) => {
        //查询条件
        const params = Object.assign(pageData, searchParam);
        const res = await postAction(url.list, params);
        if (!checkResponse(res)) {
            return false;
        }
        const { count, rows } = res.data;
        list.value = rows;
        changeTotal(count);
    };

    //新增实现
    const addAction = async (formAdd:object, callBack:()=>void) => {
        const res = await postAction(url.add, formAdd);
        if (!checkResponse(res, true)) {
            return false;
        }
        callBack();
        getList();
      };

      //编辑实现
    const editAction = async (formAdd:object, callBack:()=>void) => {
        const res = await putAction(url.update, formAdd);
        if (!checkResponse(res, true)) {
            return false;
        }
        callBack();
        getList();
      };
    //删除一项
    const deleteList = async (id: number) => {
        const res = await deleteAction(url.delete, {id});
        if (!checkResponse(res, true)) {
            return false;
        }
        getList();
    };

    return {
        currentPage,
        pageData,
        changeSize,
        changePage,
        changeTotal,

        list,
        getList,
        addAction,
        editAction,
        deleteList
    }
}