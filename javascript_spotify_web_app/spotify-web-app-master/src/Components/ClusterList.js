import ClusterItem from "./ClusterItem";
import './Stylesheets/ClusterList.css'

export default function ClusterList(props) {
  const { clusters, value } = props;
  const ClusterItems = clusters.map((cluster) => 
    <ClusterItem 
      key={cluster.name}
      name={cluster.name}
      image={cluster.image}
      value={value}
    />
  )
  return (
    <ul className="cluster-list">
      {ClusterItems}
    </ul>
  )
}