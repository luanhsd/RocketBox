import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import {formatDistance} from 'date-fns';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {pt} from 'date-fns/locale';
import api from '../../services/api';
import styles from './styles';
import socket from 'socket.io-client';

const Box = () => {
  const [box, setBox] = useState({
    _id: '',
    title: '',
    createdAt: '',
    files: [],
    updatedAt: '',
  });
  const id = await AsyncStorage.getItem('@RocketBox:box');

  useEffect(async () => {
    api.get(`boxes/${id}`).then((response) => {
      setBox(response.data);
    });
  }, []);

  useEffect(() => {
    const io = socket('http://localhost:3001');
    io.emit('connectRoom', id);
    io.on('file', (data) => {
      console.log(box);
      setBox({...box, files: [data, ...box.files]});
    });
  }, [box]);

  openFile = async (file) => {
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/${file.title}`;

      await RNFS.downloadFile({
        fromUrl: file.url,
        toFile: filePath,
      });
      await FileViewer.open(filePath);
    } catch (err) {
      console.log('Not supported file!');
    }
  };

  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => openFile(item)} style={styles.file}>
      <View style={styles.fileInfo}>
        <Icon name="insert-drive-file" size={24} color="#A5CFFF" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>
      <Text style={styles.fileDate}>
        há {formatDistance(new Date(item.createdAt), new Date(), {locale: pt})}
      </Text>
    </TouchableOpacity>
  );

  handleUpload = () => {
    ImagePicker.launchImageLibrary({}, async (upload) => {
      if (upload.error) {
        console.log('ImagePicker error');
      } else if (upload.didCancel) {
        console.log('Canceled by user');
      } else {
        const data = new FormData();

        const [prefix, suffix] = upload.fileName.split('.');
        const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;

        data.append('file', {
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${ext}`,
        });

        api.post(`boxes/${box._id}`, data);
      }
    });
  };

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
