import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native';

interface Post {
  id: number;
  title: string;
  body: string;
}

const BlogApp = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Specify Post[] as the type for posts state

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts') // Example URL for testing
      .then(response => response.json())
      .then((data: Post[]) => setPosts(data)) // Specify Post[] as the type for the fetched data
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const renderItem = ({ item }: { item: Post }) => ( // Specify item: Post as the type
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  postContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postBody: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default BlogApp;
