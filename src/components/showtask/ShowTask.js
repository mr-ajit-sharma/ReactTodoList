// importing React from react
import React from "react";
import { IonIcon } from '@ionic/react';
import {createOutline,trashOutline,checkmarkDoneCircle,checkmarkDoneCircleOutline} from 'ionicons/icons'
// importing css files
import Styles from "./ShowTask.module.css";

// creating a component for creating all the task
const ShowTask = (props) => {

  return (
    <div className={Styles.taskBox}>
      {/* mapping over all the post and rendering all the data */}
      {props.todo.map((post) => {
        return (
            <div key={post.id} className={Styles.task}>
            <h5>{post.title}</h5>  
            <div className={Styles.icons}>
              <IonIcon
              icon={createOutline}
                onClick={() => {
                  props.updateHandler(post, true);
                }}
              ></IonIcon>
              <IonIcon
                onClick={() => {
                  props.delete(post.id);
                }}
                icon={trashOutline}
                ></IonIcon>
              <IonIcon
                onClick={() => {
                  props.completed(post);
                }}
                icon={
                  post.completed
                    ? checkmarkDoneCircle
                    : checkmarkDoneCircleOutline
                }
              ></IonIcon>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// exporting the ShowTask component by default
export default ShowTask;