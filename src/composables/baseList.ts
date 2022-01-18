/*
 * @Descripttion: 列表通用增删查改
 * @version: 1.0
 * @Author: fei
 * @Date: 2021-07-30 15:06:38
 * @LastEditors: fei
 * @LastEditTime: 2021-12-22 14:06:58
 */
import { Ref, ref } from "vue";
import pageContral from "./basePage"
import { checkResponse } from "@/utils/utils";
import { deleteAction, postAction, putAction } from '@/api/axios'
interface api {
    list: string,
    add: string,
    update: string,
    delete: string,
}
interface returnObject {
    currentPage: Ref<number>,
    pageData: object,
    changeSize: (value: number, callback: () => void) => void,
    changePage: (value: number, callback: () => void) => void,
    changeTotal: (value: number) => void
    list: Ref<Array<object>>,
    getList: (searchParam?: object) => Promise<void>,
    addAction: (formAdd: object, callBack: () => void, otherFilter?: {}) => Promise<void>,
    editAction: (formAdd: object, callBack: () => void, otherFilter?: {}) => Promise<void>,
    deleteList: (id: number, otherFilter?: {}) => Promise<void>
}
/**
 * 列表通用增删查改
 * @param {String} url 请求参数
 * @returns { Number } currentPage 当前页码值
 * @returns { Object } pageData 分页对象
 * @returns { Function } changeSize 改变分页大小 函数
 * @returns { Function } changePage 改变页码 函数
 * @returns { Function } changeTotal 改变总数 函数
 * @returns { Array<object> } list 列表数据
 * @returns { Function } addAction 新增操作
 * @returns { Function } editAction 修改操作
 * @returns { Function } deleteList 删除操作
 *  
 */
const baseList = (url: api): returnObject => {
    const list = ref([]);
    const { currentPage, pageData, changeSize, changePage, changeTotal } = pageContral();
    /**
     * 条件查询
     * @param searchParam 查询条件对象
     * @returns {void}
     */
    const getList = async (searchParam = {}): Promise<void> => {
        //查询条件
        const params = Object.assign({}, pageData, searchParam);
        const res = await postAction(url.list, params);
        if (!checkResponse(res)) {
            return;
        }
        const { count, rows } = res.data;
        list.value = rows;
        changeTotal(count);
    };

    /**
     * 新增数据
     * @param formAdd 新增数据对象
     * @param callBack 新增完成后回调函数，一般用于处理关闭弹窗等操作
     * @param otherFilter 操作完成后，刷新当前页面数据时需要的查询条件
     * @returns {void}
     */
    const addAction = async (formAdd: object, callBack: () => void, otherFilter?: {}): Promise<void> => {
        const res = await postAction(url.add, formAdd);
        if (!checkResponse(res, true)) {
            return;
        }
        callBack();
        getList(otherFilter);
    };

    /**
     * 编辑数据
     * @param formAdd 编辑数据对象
     * @param callBack 编辑完成后回调函数，一般用于处理关闭弹窗等操作
     * @param otherFilter 操作完成后，刷新当前页面数据时需要的查询条件
     * @returns {void}
     */
    const editAction = async (formAdd: object, callBack: () => void, otherFilter?: {}): Promise<void> => {
        const res = await putAction(url.update, formAdd);
        if (!checkResponse(res, true)) {
            return;
        }
        callBack();
        getList(otherFilter);
    };
    /**
     * 单项删除
     * @param id 删除项id
     * @param otherFilter 操作完成后，刷新当前页面数据时需要的查询条件
     * @returns {void}
     */
    const deleteList = async (id: number, otherFilter?: {}): Promise<void> => {
        const res = await deleteAction(url.delete, { id });
        if (!checkResponse(res, true)) {
            return;
        }
        getList(otherFilter);
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
export default baseList;