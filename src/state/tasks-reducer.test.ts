import { TasksStateType } from "../App";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";


test('correct task should be deleted from correct array', () => {
    
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "Html&Css", isDone: true},
            {id: "2", title: "Js", isDone: true},
            {id: "3", title: "React&Redux", isDone: true},
            {id: "4", title: "Next", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Bread", isDone: true},
            {id: "2", title: "Milk", isDone: true},
            {id: "3", title: "Butter", isDone: false},
            {id: "4", title: "Salt", isDone: false}
        ]
    };

    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action);
    
    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(3);
    // expect(endState["todolistId2"][0].id).toBe("1");
    // expect(endState["todolistId2"][1].id).toBe("3");

    // Пробегаемся по всему массиву, и проверяем что id каждой таски не равна 2, потому что такую таску мы удалили
    // every метод массива, который пробегает по каждому элементу массива, и каждый элемент должен вернуть для 
    // данного выражения true, и выражение toBeTruthy() в данном случае тоже самое что и .toBe(true).
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();

});

test('correct task should be added to correct array', () => {
    
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "Html&Css", isDone: true},
            {id: "2", title: "Js", isDone: true},
            {id: "3", title: "React&Redux", isDone: true},
            {id: "4", title: "Next", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Bread", isDone: true},
            {id: "2", title: "Milk", isDone: true},
            {id: "3", title: "Butter", isDone: false},
            {id: "4", title: "Salt", isDone: false}
        ]
    };

    const action = addTaskAC("juce", "todolistId2");
    const endState = tasksReducer(startState, action);
    
    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(5);
    // С помощью toBeDefined() мы говорим, что наша id таски была определена, что она есть.
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe(false);
    
});

test('status of specified task should be changed', () => {
    
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "Html&Css", isDone: true},
            {id: "2", title: "Js", isDone: true},
            {id: "3", title: "React&Redux", isDone: true},
            {id: "4", title: "Next", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Bread", isDone: true},
            {id: "2", title: "Milk", isDone: true},
            {id: "3", title: "Butter", isDone: false},
            {id: "4", title: "Salt", isDone: false}
        ]
    };

    const action = changeTaskStatusAC("2", false, "todolistId2");
    const endState = tasksReducer(startState, action);
    
    expect(endState["todolistId2"][1].isDone).toBeFalsy();
    expect(endState["todolistId1"][1].isDone).toBeTruthy();
});

test('title of specified task should be changed', () => {
    
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "Html&Css", isDone: true},
            {id: "2", title: "Js", isDone: true},
            {id: "3", title: "React&Redux", isDone: true},
            {id: "4", title: "Next", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Bread", isDone: true},
            {id: "2", title: "Milk", isDone: true},
            {id: "3", title: "Butter", isDone: false},
            {id: "4", title: "Salt", isDone: false}
        ]
    };

    const action = changeTaskTitleAC("2", "Milkyway", "todolistId2");
    const endState = tasksReducer(startState, action);
    
    expect(endState["todolistId2"][1].title).toBe("Milkyway");
    expect(endState["todolistId1"][1].title).toBe("Js");
});

test('new property with new array should be added when new todolist is added', () => {
    
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "Html&Css", isDone: true},
            {id: "2", title: "Js", isDone: true},
            {id: "3", title: "React&Redux", isDone: true},
            {id: "4", title: "Next", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Bread", isDone: true},
            {id: "2", title: "Milk", isDone: true},
            {id: "3", title: "Butter", isDone: false},
            {id: "4", title: "Salt", isDone: false}
        ]
    };

    const action = addTodolistAC("new todolist");
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("New key should be added");
    }
    
    expect(keys.length).toBe(3);
    // Тут мы проверяем что если мы нашли айдишку нового тудулиста, то мы проверяем с помощью toEqual([]),
    // что он должен быть равен пустому массиву. Почему мы не используем метод toBe([]), потому что два массива 
    // никогда не равны друг другу, и выведет не правильный результат.
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "Html&Css", isDone: true},
            {id: "2", title: "Js", isDone: true},
            {id: "3", title: "React&Redux", isDone: true},
            {id: "4", title: "Next", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Bread", isDone: true},
            {id: "2", title: "Milk", isDone: true},
            {id: "3", title: "Butter", isDone: false},
            {id: "4", title: "Salt", isDone: false}
        ]
    };

    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    
    expect(keys.length).toBe(1);
    // Если мы хотим прочитать свойство в объекте которого нет, то мы это проверяем с помощью toBeUndefined()
    expect(endState["todolistId2"]).toBeUndefined();
});
