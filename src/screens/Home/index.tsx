import React, { useState } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AppImages, SvgIcons, colors, devicePixel, fontFamily, isAndroid, responsiveHeight, responsiveWidth } from '../../assets/utilities';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { setTasks } from '../../redux/user';
import ViewTask from '../../components/ViewTask';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface Task {
  title?: string;
  description?: string;
  date?: string;
}

interface HomeProps {
  navigation: DrawerNavigationProp<HomeStackParamList, 'Home'>;
}

interface RenderItemTasksProps {
  item: Task;
  index: number
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { tasks } = useSelector((state: any) => state.user);
  const [showTask, setShowTask] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const dispatch = useDispatch();

  const RenderItemTasks: React.FC<RenderItemTasksProps> = ({ item, index }) => {
    return (
      <View key={index} style={styles.taskStyle}>
        <View style={styles.listLeft}>
          <Text style={styles.titleStyle} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.descriptionStyle} numberOfLines={1}>
            {item?.description}
          </Text>
        </View>
        <Menu>
          <MenuTrigger style={styles.optionRipple}>
            <SvgIcons.optionsIcon height={devicePixel(26)} width={devicePixel(26)} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              text="Show"
              onSelect={() => {
                setSelectedTask(item);
                setShowTask(true);
              }}
            />
            <MenuOption
              onSelect={() => {
                const filterTasks = tasks.filter((itemSelected: Task, indexSelected: number) => indexSelected !== index);
                dispatch(setTasks(filterTasks));
              }}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  const ListEmptyComponent: React.FC = () => {
    return (
      <View style={styles.emptyStyle}>
        <View style={styles.pendingTextContainer}>
          <Text style={styles.emptyTxtStyle}>No Pending Tasks :)</Text>
        </View>
      </View>
    );
  };

  const topInsets = useSafeAreaInsets();
  const gradientColors = ['#131313', '#232323', '#343434'];
  const topFix = devicePixel(35) + ((isAndroid ? (StatusBar.currentHeight ?? 0) : topInsets?.top));

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <LinearGradient colors={gradientColors} style={[styles.header, { paddingTop: topFix }]}>
        <View style={styles.leftRow}>
          <View style={styles.addParent}>
            <TouchableRipple onPress={() => navigation.openDrawer()} rippleColor="#fff" style={styles.touchableArea}>
              <Image source={AppImages.drawerImg} style={styles.drawerIconStyle} />
            </TouchableRipple>
          </View>
          <Text style={styles.leftHeaderText}>Today's tasks</Text>
        </View>
        <View style={styles.addParent}>
          <TouchableRipple onPress={() => navigation.navigate('CreateTask')} rippleColor="#ffffff40" style={styles.touchableArea}>
            <SvgIcons.addHeader height={devicePixel(35)} width={devicePixel(35)} style={styles.borderRadiusComplete} />
          </TouchableRipple>
        </View>
      </LinearGradient>
      <View style={styles.secondContainer}>
        <FlatList data={tasks}
          renderItem={(rest) => (
            <RenderItemTasks {...rest} />
          )}
          ListEmptyComponent={ListEmptyComponent} />
      </View>
      <ViewTask
        isModalVisible={showTask}
        setModalVisible={setShowTask}
        title={selectedTask?.title || ''}
        description={selectedTask?.description || ''}
        date={selectedTask?.date || ''}
      />
    </View>
  );
};

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",

  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: devicePixel(25),
    paddingHorizontal: devicePixel(10),
    // borderWidth: devicePixel(4),
    borderColor: "#161616",
    borderTopWidth: 0,

  },
  leftHeaderText: {
    fontFamily: fontFamily.appTextBold,
    color: colors.appSolidWhite,
    fontSize: devicePixel(24),
    marginLeft: devicePixel(10)
  },
  borderRadiusComplete: {
    borderRadius: 100,
    backgroundColor: "#fff"
  },
  touchableArea: {
    width: devicePixel(50),
    height: devicePixel(50),
    alignItems: 'center',
    justifyContent: "center"
  },
  addParent: {
    // borderRadius: 8,
    overflow: "hidden"
  },
  secondContainer: {
    flexGrow: 1,
    borderColor: "#161616",
    // borderWidth: devicePixel(4),
    borderTopWidth: devicePixel(2),
    backgroundColor: "#252525",
  },
  drawerIconStyle: {
    height: devicePixel(37),
    width: devicePixel(42),
    resizeMode: "stretch"
  },

  taskStyle: {
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: devicePixel(4),
    marginTop: devicePixel(20),
    paddingHorizontal: devicePixel(18),
    paddingVertical: devicePixel(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listLeft: {
    width: "80%",
  },
  titleStyle: {
    fontFamily: fontFamily.appTextBold,
    color: "#000",
    fontSize: devicePixel(18),
  },
  descriptionStyle: {
    fontFamily: fontFamily.appTextRegular,
    color: "#000",
    marginTop: devicePixel(4)
  },
  optionRipple: {
    width: devicePixel(35),
    height: devicePixel(45),
    alignItems: 'center',
    justifyContent: "center",
    marginRight: devicePixel(-10)
  },
  emptyStyle: {
    height: responsiveHeight(75),
    alignItems: 'center',
    justifyContent: "center"
  },
  emptyTxtStyle: {
    color: "#fff",
    fontFamily: fontFamily.appTextMedium,
    fontSize: devicePixel(20),
  },
  pendingTextContainer: {
    paddingVertical: devicePixel(20),
    backgroundColor: "rgba(0,0,0,0.1)",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
})