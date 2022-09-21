import { Habit, habitActions } from "@/lib/habits";
import { blipSound, confettiSound } from "@/lib/sounds";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  CloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { DraggableProvided } from "@hello-pangea/dnd";
import confetti from "canvas-confetti";

export const HabitItem = ({
  habit,
  handle,
}: {
  habit: Habit;
  handle: DraggableProvided["dragHandleProps"];
}) => {
  return (
    <HStack spacing={4}>
      <IconButton
        size="sm"
        aria-label="Drag todo"
        icon={<DragHandleIcon boxSize={4} />}
        variant="ghost"
        color={"gray.500"}
        _groupHover={{
          color: "gray.500",
        }}
        _active={{}}
        sx={{ touchAction: "none" }}
        {...handle}
      />
      <Checkbox
        size="lg"
        colorScheme="primary"
        isChecked={habit.done}
        onChange={(e) => {
          const newHabits = habitActions.toggle(habit.id);

          const checked = e.target.checked;

          if (newHabits.every((habits) => habits.done) && checked) {
            confettiSound();
            confetti();
          } else if (checked) {
            blipSound();
          }
        }}
      />

      <Editable
        w="100%"
        fontSize="xl"
        fontWeight="semibold"
        defaultValue={habit.name}
        onSubmit={(newValue) => {
          habitActions.editName(habit.id, newValue);
        }}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      <CloseButton
        color="gray.500"
        onClick={() => {
          habitActions.remove(habit.id);
        }}
      />
    </HStack>
  );
};
