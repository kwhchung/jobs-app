import {
  Flex,
  Box,
  CloseButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Notification,
  NotificationType,
  useNotifications,
} from "@/stores/notifications";

export const Notifications = () => {
  const {
    notifications,
    dismissNotification,
  } = useNotifications();

  if(notifications.length < 1){
    return null;
  }
  return (
    <Box
      as="section"
      p="4"
      position="fixed"
      top="12"
      right="0"
      zIndex="1"
    >
      <Flex
        gap="4"
        direction="column-reverse"
      >
        { notifications.map(notification => (
          <NotificationToast
            key={ notification.id }
            notification={ notification }
            onDismiss={ dismissNotification }
          />
        )) }
      </Flex>
    </Box>
  );
};

const notificationVariants: Record<NotificationType, {
  color: string;
}> = {
  info: {
    color: "primary",
  },
  success: {
    color: "green",
  },
  warning: {
    color: "orange",
  },
  error: {
    color: "red",
  },
};

type NotificationToastProps = {
  notification: Omit<Notification, "duration">;
  onDismiss: (id: string) => void;
};

const NotificationToast = ({
  notification: {
    id,
    type,
    title,
    message,
  },
  onDismiss,
}: NotificationToastProps) => (
  <Box
    w={ {
      base: "full",
      sm: "md",
    } }
    boxShadow="md"
    bg="white"
    borderRadius="lg"
    { ...notificationVariants[type] }
  >
    <Stack
      direction="row"
      p="4"
      gap="3"
      justifyContent="space-between"
    >
      <Stack gap="2.5">
        <Stack gap="1">
          <Text
            fontSize="sm"
            fontWeight="medium"
          >
            { title }
          </Text>
          { message && (
            <Text
              fontSize="sm"
              color="muted"
            >
              { message }
            </Text>
          ) }
        </Stack>
      </Stack>
      <CloseButton
        onClick={ () => onDismiss(id) }
        transform="translateY(-6px)"
      />
    </Stack>
  </Box>
);
