import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import Constants from 'expo-constants';

import Movie from '../components/Movie';
import apiMovies from '../data/movies';
import Logo from '../components/Logo';
import CONFIG from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {

	const [activeCategory, setActiveCategory] = useState('2');
	const [movies, setMovies] = useState([]);
	const [limit, setLimit] = useState(20);
	const [favorites, setFavorites] = useState([]);

	const getMovies = async () => {
		let movies = [];
		const storedMovies = await AsyncStorage.getItem('movies');
		let masterMovies = storedMovies == null ? apiMovies : storedMovies;

		for (let i = 0; i < limit % masterMovies.length; i++) {
			movies.push(masterMovies[i]);
		}
		setMovies(movies);
		setLimit(limit + 20);
	}

	const getFavorites = async () => {
		// const favs = (await AsyncStorage.getItem('favoriteMovies')).split('/');
		const favs = [];
		setFavorites(favs);
	}

	const isFavorite = async (id) => {
		return favorites.includes(id);
	}

	const loadMore = () => {
		getMovies();
	}

	useEffect(() => {
		getFavorites();
		getMovies();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight }}>
			<View
				style={{
					backgroundColor: '#fff',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottomWidth: 1,
					borderBottomColor: '#ccc',
					height: 50
				}}>
				<MaterialIcons name='menu' size={30}
					onPress={() => { }}
				/>
				<View
					style={{ justifyContent: 'center', alignItems: 'center' }}
				>
					<Logo />
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<MaterialIcons name='search'
						size={30} onPress={() => { navigation.navigate('Search') }}
					/>
					<MaterialIcons name='more-vert' size={30} />
				</View>
			</View>
			<View>
				<SafeAreaView>
					<FlatList
						data={CONFIG.moviesCategories}
						horizontal
						keyExtractor={item => item.id.toString()}
						showsHorizontalScrollIndicator={false}
						renderItem={({ item }) => {
							return (
								<Button key={item.id}
									style={{ backgroundColor: activeCategory == item.id ? '#111' : '#ff1155', margin: 5 }}
									labelStyle={{ textTransform: 'capitalize', color: activeCategory == item.id ? '#fff' : '#111' }}
									onPress={() => { setActiveCategory(item.id); }}
								>
									{item.label}
								</Button>
							)
						}}
					>
					</FlatList>
				</SafeAreaView>
			</View>
			<ScrollView style={{ backgroundColor: '#fcfcfc', flex: 1 }}>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
					{
						movies.map(movie => {
							return (
								<Movie
									key={movie.id}
									id={movie.id}
									title={movie.title}
									img={movie.img}
									videoUrl={movie.url}
									description={movie.description}
									nav={navigation}
									isFav={true}
								/>
							)
						})
					}
				</View>

				<Button mode='contained' style={{ backgroundColor: '#ff1155', margin: 10, padding: 10 }}
					onPress={() => {
						loadMore();
					}}
					labelStyle={{ color: '#fff' }}
					icon='plus'
				>
					Mostrar Mais
				</Button>
			</ScrollView>
		</View>
	);
}