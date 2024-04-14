import { Input } from 'antd';
const { Search } = Input;
import type { SearchProps } from 'antd/es/input/Search';

const ChatSearchBar = ({onSearch}:{onSearch:SearchProps['onSearch']}) => {
    return <>
        <div className="flex flex-row items-center justify-center w-full">
            <div className="ml-2 font-bold text-2xl">
                <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
            </div>
        </div>
    </>
}

export default ChatSearchBar