import { habitActions, habitsStore } from "@/lib/habits";
import { Box, chakra, Flex, Input } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FC, useState } from "react";
import { useSnapshot } from "valtio";
import { HabitItem } from "./habit-item";

export const HabitsList: FC = () => {
  const [newHabit, setNewHabit] = useState("");

  const habitsSnap = useSnapshot(habitsStore);

  return (
    <Flex direction="column">
      <DragDropContext onDragEnd={habitActions.reorder}>
        <Droppable droppableId="droppable-habits">
          {(provided, snapshot) => (
            <Flex
              direction="column"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {habitsSnap.habits.map((habit, index) => (
                <Draggable
                  key={habit.id}
                  draggableId={`draggable-id-${habit.id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      my={2}
                    >
                      <HabitItem
                        handle={provided.dragHandleProps}
                        habit={habit}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>

      <chakra.form
        my={4}
        onSubmit={(e) => {
          e.preventDefault();

          habitActions.add(newHabit);

          setNewHabit("");
        }}
      >
        <Input
          onChange={(e) => {
            setNewHabit(e.target.value);
          }}
          name="input"
          value={newHabit}
          placeholder="Add a new habit"
          autoComplete="off"
        />
      </chakra.form>
    </Flex>
  );
};
