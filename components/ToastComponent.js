import {
    Alert,
    CloseIcon,
    HStack,
    IconButton,
    Text,
    VStack,
  } from "native-base";
  import React from "react";
  
  const ToastComponent = ({ title, description, closeHandler, status }) => {
    return (
      <Alert
        maxWidth="100%"
        alignSelf="center"
        flexDirection="row"
        status={status ? status : "error"}
        variant="left-accent"
        style={{ marginBottom: -45 }}
      >
        <VStack space={1} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text
                fontSize="md"
                fontWeight="medium"
                flexShrink={1}
                color={"darkText"}
              >
                {title}
              </Text>
            </HStack>
  
            <IconButton
              variant="unstyled"
              icon={<CloseIcon size={4} />}
              _icon={{
                color: "darkText",
              }}
              onPress={closeHandler}
            />
          </HStack>
          <Text px="6" color={"darkText"}>
            {description}
          </Text>
        </VStack>
      </Alert>
    );
  };
  
  export default ToastComponent;