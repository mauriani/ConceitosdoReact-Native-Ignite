import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task

    const taskExist = tasks.find(item => item.title === newTaskTitle);

    if(taskExist){
      Alert.alert("Erro", "Você não pode cadastrar uma task com o mesmo nome!");
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };
      
      setTasks(oldState => [...oldState, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists

    // criando um novo array
    const updatedTasks = tasks.map(task => ({...task}));

    const foundItem = updatedTasks.find(item => item.id === id);

    if(!foundItem){
      return;
    }

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () =>  
        
          setTasks(oldState => oldState.filter(
            toDo => toDo.id !== id
          ))
      }
      ]
    );
   
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs){

    // começando copiando o nosso array
    const updatedTasks = tasks.map(task => ({...task}));

    // verifica se tem task com o ID que está vindo
    const taskToBeUpdated = updatedTasks.find(item => item.id === taskId);

    if(!taskToBeUpdated)return;

    taskToBeUpdated.title = taskNewTitle;

    setTasks(updatedTasks);

  }


  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})