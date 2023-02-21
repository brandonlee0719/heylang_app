import { View, Text,Alert, Pressable, ScrollView, StyleSheet, Switch, TouchableOpacity, KeyboardAvoidingView, StatusBar } from "react-native";
import * as SecureStore from "expo-secure-store";
import RnText from "../components/Text";
import Box from "../components/Box";
import * as React from "react";
import { globalStyles, theme } from "../styles/styles";
import { useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import Icon from "react-native-vector-icons/FontAwesome";
import Input from "../components/Input";
import client from '../api/api'
import * as Speech from 'expo-speech'

const defaultMessages = [
  {
    textFrench: "Excusez-moi! Je suis perdu et je me demandais si vous pouviez m'aider?",
    textEnglish: "Excuse me! I'm lost and was wondering if you could help me?",
    textJapanese: "すみません！ 道に迷ってしまい、助けていただけないでしょうか？",
    textGerman: "Verzeihung! Ich bin verloren und habe mich gefragt, ob Sie mir helfen könnten?",
    textSpanish: "¡Disculpe! Estoy perdido y me preguntaba si podrías ayudarme.",
    sender: true,
  },
  {
    textFrench: "Bien sûr ! Qu'est-ce que tu cherches?",
    textEnglish: "Of course! What are you looking for?",
    textItalian: "Certo! Cosa stai cercando?",
    textJapanese: "もちろん！ 何を探していますか？",
    textGerman: "Natürlich! Wonach suchst du?",
    textSpanish: "Estoy tratando de encontrar la catedral.",
    sender: false,
  },
  {
    textFrench: "J'essaie de trouver la cathédrale.",
    textEnglish: "I'm trying to find the cathedral.",
    textItalian: "Sto cercando di trovare la cattedrale.",
    textJapanese: "大聖堂を探しています。",
    textGerman: "Ich versuche, die Kathedrale zu finden.",
    textSpanish: "Estoy tratando de encontrar la catedral.",
    sender: true,
  },
  {
    textFrench: "Quelle cathédrale essayez-vous de trouver ? Il y a beaucoup de cathédrales à Paris !",
    textEnglish: "Which cathedral are you trying to find? There are many cathedrals in Paris!",
    textItalian: "Quale cattedrale stai cercando di trovare? Ci sono molte cattedrali a Parigi!",
    textJapanese: "どの大聖堂を見つけようとしていますか? パリにはたくさんの大聖堂があります！",
    textGerman: "Welche Kathedrale suchen Sie? Es gibt viele Kathedralen in Paris!",
    textSpanish: "¿Qué catedral estás tratando de encontrar? ¡Hay muchas catedrales en París!",
    sender: false,
  },
];
export default function HomeScreen() {
  const [isPrompt, setIsPrompt] = useState(true);
  const [messages, setMessages] = useState(defaultMessages);
  const [sendingMessage, setSendingMessage] = useState("");
  const inputRef = useRef(null);
  const toggleSwitch = () => setIsPrompt((previousState) => !previousState);
  // context

  const { languages, difficulties, situations, languagePicker, setLanguagePicker, difficultyPicker, setDifficultyPicker, situationPicker, setSituationPicker, audioControls, setAudioControls, selectedLanguage, setSelectedLanguage, selectedDifficulty, setSelectedDifficulty, selectedSituation, setSelectedSituation, value, setValue, isEnabled, setIsEnabled } = React.useContext(UserContext)

  React.useEffect(() => {
    Speech.speak("Hello world")
    setLanguagePicker('English')
    setDifficultyPicker('Easy')
    setSituationPicker('General')
    setSelectedLanguage('English')
    setSelectedDifficulty('easy')
    setSelectedSituation('general')
    setValue("Normal")
    // setAudioControls(true)
    // setisPrompt(true)
    // setValue(true)
  }, [])
  React.useEffect(() => {
    setMessages([...defaultMessages])
  }, [selectedLanguage, selectedSituation, selectedDifficulty])

  const inputVoice = (msg) => {
    if (isEnabled === false) {
      Alert.alert("Change your audio settings first, in order to listen the sound!")
      return;
    }
    console.log(isEnabled)
    if (selectedLanguage === 'French') {
      Speech.speak(msg.textFrench, {
        language: "fr",
        volume: 1.0,
        rate: value === "slow" ? 0.5 : 1.0
      })
    } else if (selectedLanguage === "Italian") {
      Speech.speak(msg.textItalian, {
        language: "it",
        volume: 1.0,
        rate: value === "slow" ? 0.5 : 1.0
      })
    } else if (selectedLanguage === "English") {
      Speech.speak(msg.textEnglish, {
        language: "en",
        volume: 1.0,
        rate: value === "slow" ? 0.5 : 1.0
      })
    }
    else if (selectedLanguage === 'German') {
      Speech.speak(msg.textGerman, {
        language: "de",
        volume: 1.0,
        rate: value === "slow" ? 0.5 : 1.0
      })
    } else if (selectedLanguage === "Japanese") {
      Speech.speak(msg.textJapanese, {
        language: "ja",
        volume: 1.0,
        rate: value === "slow" ? 0.5 : 1.0
      })
    } else if (selectedLanguage === "Spanish") {
      Speech.speak(msg.textSpanish, {
        language: "es",
        volume: 1.0,
        rate: value === "slow" ? 0.5 : 1.0
      })
    }
  }

  const onSubmitMessage = async (newMessage) => {
    // send message
    if (selectedLanguage === 'English') {
      setMessages((previousState) => [
        ...previousState,
        { textEnglish: newMessage, sender: true },
      ]);
    }
    else if (selectedLanguage === 'French') {

      setMessages((previousState) => [
        ...previousState,
        { textFrench: newMessage, sender: true },
      ]);
    }
    else if (selectedLanguage === 'Italian') {

      setMessages((previousState) => [
        ...previousState,
        { textItalian: newMessage, sender: true },
      ]);
    }
    else if (selectedLanguage === 'German') {
      setMessages((previousState) => [
        ...previousState,
        { textGerman: newMessage, sender: true },
      ]);
    }
    else if (selectedLanguage === 'Spanish') {

      setMessages((previousState) => [
        ...previousState,
        { textSpanish: newMessage, sender: true },
      ]);
    }
    else if (selectedLanguage === 'Japanese') {

      setMessages((previousState) => [
        ...previousState,
        { textJapanese: newMessage, sender: true },
      ]);
    }
    inputRef.current.clear();
    inputRef.current.blur();

    let sl = "";
    if (selectedLanguage === 'French') {
      sl = "fr-FR"
    } else if (selectedLanguage === "Italian") {
      sl = "it-IT"
    } else if (selectedLanguage === "English") {
      sl = "en-GB"
    } else if (selectedLanguage === "Japanese") {
      sl = "jp-JP"
    } else if (selectedLanguage === "Spanish") {
      sl = "es-ES"
    } else if (selectedLanguage === "German") {
      sl = "de-DE"
    }

    // define body for the server request
    const body = {
      "conversation_text": newMessage.toLowerCase(),
      "situation": selectedSituation.toLowerCase(),
      "language": sl,
      "difficulty": selectedDifficulty.toLowerCase(),
      "audio": isEnabled === false ? "off" : "on",
      "speed": "slow"
    };
    const token = await SecureStore.getItemAsync('userToken')

    const res = await client.post('/practice/botres', body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*"
      }
    })

    // AI response
    const ai = res.data.conversation_text.split('\n')[1].split(':')[1]
    // Sending AI response
    if (selectedLanguage === 'English') {
      setMessages((previousState) => [
        ...previousState,
        { textEnglish: ai, sender: false },
      ]);
    }
    else if (selectedLanguage === 'French') {

      setMessages((previousState) => [
        ...previousState,
        { textFrench: ai, sender: false },
      ]);
    }
    else if (selectedLanguage === 'Italian') {

      setMessages((previousState) => [
        ...previousState,
        { textItalian: ai, sender: false },
      ]);
    }
    else if (selectedLanguage === 'German') {
      setMessages((previousState) => [
        ...previousState,
        { textGerman: ai, sender: false },
      ]);
    }
    else if (selectedLanguage === 'Spanish') {

      setMessages((previousState) => [
        ...previousState,
        { textSpanish: ai, sender: false },
      ]);
    }
    else if (selectedLanguage === 'Japanese') {

      setMessages((previousState) => [
        ...previousState,
        { textJapanese: ai, sender: false },
      ]);
    }
    let s = "hello"
    inputRef.current.clear();
    inputRef.current.blur();
  };

  const renderText = (msg) => {
    if (selectedLanguage === "English") return msg.textEnglish;
    else if (selectedLanguage === "French") return msg.textFrench;
    else if (selectedLanguage === "Italian") return msg.textItalian;
    else if (selectedLanguage === "Spanish") return msg.textSpanish;
    else if (selectedLanguage === "Japanese") return msg.textJapanese;
    else if (selectedLanguage === "German") return msg.textGerman;
  }

  const returnColor = (msg) => {
    return msg.sender ? "rgb(25,130,252)" : "rgb(38,38,38)"
  }

  return (
    <Box backgroundColor={"background"} style={globalStyles.container}>
      <StatusBar backgroundColor={'#000'} color={"#fff"} />
      <Box style={globalStyles.row} margin={"l"}>
        <Text style={{ fontSize: 18, color:'#fff'}}>
          Show/Hide Prompt
        </Text>
        <Box style={styles.marginLeft}>
          <Switch
            trackColor={{ true: "#00a804" }}
            thumbColor={isPrompt ? "#f4f3f4" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isPrompt}
          />
        </Box>
      </Box>
      {isPrompt && (
        <View
          // margin={"s"}
          // backgroundColor={"dialog"}
          // padding={"s"}
          style={{...styles.dialogContainer, backgroundColor: 'rgba(103,112,163,0.35)'}}
        >
          <Text color={"primary"} variant={"body"} style={styles.text}>
            The following is a conversation between you and a stranger. The
            Human is asking for directions in Paris. The AI in this conversation
            is the stranger on the street who the human is asking. The stranger
            is directing them to your chosen location. The AI can only respond
            in French.
          </Text>
        </View>
      )}
      <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "padding"}
          style={{ flex: 1, width: '100%', }}
      >
        <View
          style={{ ...globalStyles.flex, ...styles.dialogContainer, padding: 8, margin: 8 }}
        >
          <View
            style={{ flex: 1, ...{  } }} // ...{ transform: [{ scaleX: 1 }] },
          >
            <ScrollView
              style={[globalStyles.flex]}
              contentContainerStyle={{  }}
            >
              <Text style={{ alignSelf: 'center', color: '#cfcecf', fontWeight: '900' }}>Feb 17, 2022</Text>
              <Text style={{ alignSelf: 'center', color: '#cfcecf', fontWeight: '400' }}>You are Officially using heyLaing</Text>
              {messages.map((message, index) => (
                <TouchableOpacity key={index}>
                  <View
                    style={[{
                      borderRadius: 10,
                      alignSelf: message.sender ? "flex-end" : "flex-start",
                      padding: 8,
                      margin: 8,
                      width: '75%',
                    }, message.sender ? styles.chat : styles.foreg ]}

                  >
                    <TouchableOpacity onPress={() => inputVoice(message)}>
                      {Platform.OS === 'android' &&
                        <Text variant={"body"} color={"primary"} style={{ fontWeight: '700', color: '#fff',}}>
                          {
                            renderText(message)
                          }
                        </Text>
                      }
                      {Platform.OS === 'ios' &&
                        <Text variant={"body"} color={"primary"} style={{ fontWeight: '700', color: '#fff' }}>
                          {
                            renderText(message)
                          }
                        </Text>
                      }
                    </TouchableOpacity>
                    {/* <Text style={{ transform: [{ rotateX: '180deg' }] }}>
                      {message.text}
                    </Text> */}

                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View>
            <View
              style={{
                ...globalStyles.row,
                ...styles.messageContainer,
                padding: 8,
                backgroundColor: '#fff'
              }}
            >
              <Input
                inputRef={inputRef}
                placeholder="Send your message"
                // placeholderTextColor={}
                value={sendingMessage}
                onChangeText={(message) => setSendingMessage(message)}
                style={styles.messageInput}
                onSubmitEditing={() => onSubmitMessage(sendingMessage)}
                multiline
              />
              <Pressable onPress={() => onSubmitMessage(sendingMessage)}>
                <Icon
                  name="send"
                  backgroundColor={theme.colors.primary}
                  color={theme.colors.foreground}
                  size={30}
                  borderRadius={50}
                  style={{ paddingRight: 10 }}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={{ ...globalStyles.center, padding: 8 }}>
        <Pressable
            style={{ ...globalStyles.center, ...styles.micButton }}
            onPress={inputVoice}
        >
          <Icon
              name="microphone"
              backgroundColor={theme.colors.primary}
              color={theme.colors.foreground}
              size={30}
              borderRadius={50}
          />
        </Pressable>
      </View>
    </Box>
  );
}
const styles = StyleSheet.create({
  marginLeft: {
    marginLeft: 16,
  },
  text: {
    textAlign: "justify",
    color: '#fff'
  },
  dialogContainer: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    padding: 8,
  },
  messageContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageInput: {
    width: "80%",
    height: 60,
    color: theme.colors.foreground,
    ...theme.textVariants.body,
  },
  micButton: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    borderColor: theme.colors.shade,
    borderWidth: 2,
  },
  foreg: {
    backgroundColor: 'rgb(38,38,38)'
  },
  chat: {
    backgroundColor: "rgb(25,130,252)"
  }
});
