import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { Button, Checkbox, Searchbar } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import Movie from '../components/Movie';
import apiMovies from '../data/movies';
import Logo from '../components/Logo';
import CONFIG from '../config';

export default function Home({ navigation }) {

	const [showSearchInput, setShowSearchInput] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [activeCategory, setActiveCategory] = useState('2');
	const [movies, setMovies] = useState([]);
	const [netWorkMovies, setNetWorkMovies] = useState([]);
	const [limit, setLimit] = useState(10);

	const getMovies = () => {
		let movies = [];
		for (let i = 0; i < limit % apiMovies.length; i++) {
			movies.push(apiMovies[i]);
		}
		setMovies(movies);
		setLimit(limit + 10);
	}

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
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
							return <Movie key={movie.id} id={movie.id} title={movie.title} img={movie.img} videoUrl={movie.url} description={movie.description} nav={navigation} />
						})
					}
				</View>

				<Button mode='contained' style={{ backgroundColor: '#ff1155', margin: 10, padding: 10 }}
					onPress={() => {
						getMovies();
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