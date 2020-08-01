import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {formatDistance} from 'date-fns';
import {pt} from 'date-fns/locale';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const Box = () => {
  const [box, setBox] = useState({});
  useEffect(() => {
    getContent();
  }, []);

  async function getContent() {
    const id = await AsyncStorage.getItem('@RocketBox:box');
    api.get(`boxes/${id}`).then((response) => {
      setBox(response.data);
    });
  }

  const handleUpload = () => {
    ImagePicker.launchImageLibrary({}, async (upload) => {
      if (upload.error) {
        console.log('ImagePicker error!');
      } else if (upload.didCancel) {
        console.log('Canceled by user!');
      } else {
        const data = new FormData();
        const [prefix, suffix] = upload.fileName.split('.');
        const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;

        data.append('file', {
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${ext}`,
        });

        api.post(`boxes/${box._id}/files`, data);
      }
    });
  };

  async function openFile(item) {
    console.log(item.title);
    try {
      const FilePath = `${RNFS.DocumentDirectoryPath}/${item.title}`;
      await RNFS.downloadFile({
        fromUrl: file.url,
        toFile: FilePath,
      });

      await FileViewer.open(FilePath);
    } catch (err) {
      console.log('File not supported');
    }
  }

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => openFile(item)} style={styles.file}>
      <View style={styles.fileInfo}>
        <Icon name="insert-drive-file" size={24} color="#7159c1" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>
      <Text style={styles.fileDate}>
        há{' '}
        {formatDistance(new Date(item.createdAt), new Date(), {
          locale: pt,
        })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.boxTitle}>{box.title}</Text>
      <FlatList
        style={styles.list}
        data={box.files}
        keyExtractor={(file) => file._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.fab} onPress={handleUpload}>
        <Icon name="cloud-upload" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default Box;
