import { TableCell } from '../common/TableCell';
import { AddButton } from '../common/AddButton';
import { CancelButton } from '../common/CancelButton';

type Props = {
  value: {
    name: string;
  };
  onChange: (field: keyof Props['value'], val: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function CompanyEditRow({ value, onChange, onSave, onCancel }: Props) {
  return (
    <tr>
      <TableCell>
        <input
          type="text"
          value={value.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Company Name"
        />
      </TableCell>
      <TableCell>—</TableCell>
      <TableCell>—</TableCell>
      <TableCell nowrap>
        <AddButton onClick={onSave} />
        <CancelButton onClick={onCancel} />
      </TableCell>
    </tr>
  );
}
