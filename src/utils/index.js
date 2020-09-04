/**
 *
 * @param {*} data
 * @param {uuid} uuid long
 * @param {name}  name string
 * @param {company} company string
 * @param {date} 20/12/12 a las 18:20
 * @param {status} status boolean
 * @param {percentage} percentage number
 * @param {representative} { name: "Ioni Bowcher", image: "ionibowcher.png" }
 */

export const createRowTable = (data) => ({
  id: data?.uuid,
  name: data?.name,
  country: data.country,
  company: data?.project,
  date: data?.date,
  status: data?.status,
  activity: data?.percentaje,
  representative: { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
});

export const formatDataHiringRoom = (data) => {
  return data.reduce((acc,current) => {
      acc.push({
          key: current.id,
          name: `${current.nombre} ${current.apellido}`,
          email: current.email,
          cellPhone: current.telefonoCelular,
          age: current.fechaNacimiento,
          tags: current.conocimientos
      })
      console.log('acc', acc);
      return acc
  }, [])
}
