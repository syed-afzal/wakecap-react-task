import { Building } from "../../models";

export enum Types {
    CREATE = 'CREATE',
    DELETE = 'DELETE',
    EDIT = 'EDIT',
    SET = 'SET'
}

export const initialState = {
    selectedUser: '',
    buildings: [] as Building[],
}