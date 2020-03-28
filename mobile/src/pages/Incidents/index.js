import React, {useState, useEffect} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const navigation =useNavigation();

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents(){
        //se loading==true, não fica carregando novamente
        if (loading) {
            return;
        }

        //se não houver mais casos, retorna
        if (total > 0 && incidents.length === total) {
            return
        }

        //Se não, corre mais casos para baixo.
        setLoading(true);

        const response = await api.get('incidents', {
            params: {page}
        });

        //Para não sobrescrever os incidents, fazer conforme abaixo.
        //Cria um objeto que copia os valores que já existem
        //Depois copia o que vem de response.data
        //Forma de Armazenar dois vetores dentro de React
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count'])
        
        //Muda o número da página
        setPage(page + 1);

        //Quando não tiver mais casos, para de carregar novamente.
        setLoading(false)
    }

    useEffect(() => {
      loadIncidents();  
    })

    return(
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                //chama função ao chegar no final da lista
                onEndReached={loadIncidents}
                //Em que parte da lista deve estar o usuário para carregar mais casos
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}:</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}
                        </Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )} 
            />

        </View>
    );
}