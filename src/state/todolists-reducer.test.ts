import { FilterValuesType, TodolistType } from './../App';
import { v1 } from "uuid";
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistFilterActionType, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './todolists-reducer';


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 1},
        {id: todolistId2, title: "What to buy", filter: "all", order: 2},
    ];

    // const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1});

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1));
    
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 1},
        {id: todolistId2, title: "What to buy", filter: "all", order: 2},
    ];

    // const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle});
    
    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 1},
        {id: todolistId2, title: "What to buy", filter: "all", order: 2},
    ];

    // const action = {
    //     // Мы говорим type script-у, что-бы он воспринимал эту строку как константу
    //     type: "CHANGE-TODOLIST-TITLE" as const,
    //     id: todolistId2,
    //     title: newTodolistTitle
    // }

    const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);
    
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 1},
        {id: todolistId2, title: "What to buy", filter: "all", order: 2},
    ];

    // const action: ChangeTodolistFilterActionType = {
    //     // Мы говорим type script-у, что-бы он воспринимал эту строку как такой тип ChangeTodolistFilterActionType
    //     type: "CHANGE-TODOLIST-FILTER",
    //     id: todolistId2,
    //     filter: newFilter
    // }

    const action = ChangeTodolistFilterAC(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);
    
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
