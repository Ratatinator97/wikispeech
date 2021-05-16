export default async (context, locale) => {
    return await Promise.resolve({
        SearchForAny: 'Busca cualquiera pagina wikipedia ...',
        SearchForAnyExample: 'i.e. Alejandro Magno',
        ListenTheArticle: 'Escuchar el articulo',
        PlayTheEntire: 'Escuchar todo el articulo',
        PlayTheSection: 'Escuchar la sección'
    })
}