import './Pairs.css';

function Pairs(props) {
    return (
        <tbody>
            {props.props.map((data) => {
                return (
                    <tr key={data.id1 + data.id2 + data.projectId + data.days}>
                        <td class="rows">{data.id1}</td>
                        <td class="rows">{data.id2}</td>
                        <td class="rows">{data.projectId}</td>
                        <td class="rows">{data.days}</td>
                    </tr>
                );
            })}
        </tbody>
    );
}

export default Pairs;
