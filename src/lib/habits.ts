import { DropResult } from "@hello-pangea/dnd";
import { proxy, subscribe } from "valtio";
import { derive } from "valtio/utils";

interface HabitsStore {
  habits: Habit[];
}

export interface Habit {
  id: string;
  name: string;
  done: boolean;
}

const habitsStorage = window.localStorage.getItem("habits-store");

export const habitsStore = proxy<HabitsStore>(
  (typeof habitsStorage === "string" && JSON.parse(habitsStorage)) || {
    habits: [],
  }
);

export const habitsStoreDerived = derive({
  someDone: (get) => get(habitsStore).habits.some((habit) => habit.done),
});

subscribe(habitsStore, () => {
  localStorage.setItem("habits-store", JSON.stringify(habitsStore));
});

const habits = habitsStore.habits;

const add = (name: string) => {
  const id = Math.random().toString(36).substring(2);

  habits.push({ id, name, done: false });
};

const remove = (id: string) => {
  const index = habits.findIndex((habit) => habit.id === id);

  habits.splice(index, 1);
};

const toggle = (id: string) => {
  const habit = habits.find((habit) => habit.id === id);
  if (habit) {
    habit.done = !habit.done;
  }

  return habits;
};

const editName = (id: string, name: string) => {
  const habit = habits.find((habit) => habit.id === id);
  if (habit) {
    habit.name = name;
  }
};

const toggleAll = () => {
  habits.map((habit) => (habit.done = false));
};

const reorder = (result: DropResult) => {
  if (!result.destination) {
    return;
  }

  const [reorderedItem] = habits.splice(result.source.index, 1);
  habits.splice(result.destination.index, 0, reorderedItem);
};

export const habitActions = {
  add,
  remove,
  toggle,
  editName,
  toggleAll,
  reorder,
};
