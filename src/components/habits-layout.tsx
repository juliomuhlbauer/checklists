import { habitActions, habitsStore, habitsStoreDerived } from "@/lib/habits";
import { RepeatIcon } from "@chakra-ui/icons";
import {
  Container,
  Heading,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { FC } from "react";
import { useSnapshot } from "valtio";
import { HabitsList } from "./habits.list";

export const HabitsLayout: FC = () => {
  const someDone = useSnapshot(habitsStoreDerived).someDone;

  return (
    <Container py={{ base: 8, md: 16 }}>
      <Stack spacing={8}>
        <HStack justify="space-between">
          <Heading>Hábitos</Heading>
          <IconButton
            variant="ghost"
            colorScheme="primary"
            icon={<RepeatIcon />}
            {...(!someDone && {
              color: "gray.500",
              isDisabled: true,
            })}
            aria-label="clean"
            onClick={() => {
              habitActions.toggleAll();
            }}
          />
        </HStack>

        <HabitsList />
      </Stack>
    </Container>
  );
};
