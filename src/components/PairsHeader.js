import "./PairsHeader.css"

function PairsHeader(props) {

    return (
        <thead>
            <tr>
                {props.dataHeader.map((el, index) => {
                    return (
                        <th scope="col" key={index} class="header">
                            {el}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}

export default PairsHeader;
