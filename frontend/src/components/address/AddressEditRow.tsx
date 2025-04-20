import { TableCell } from '../common/TableCell';
import { AddButton } from '../common/AddButton';
import { CancelButton } from '../common/CancelButton';

type Props = {
  value: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };
  onChange: (field: keyof Props['value'], val: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function AddressEditRow({ value, onChange, onSave, onCancel }: Props) {
  return (
    <tr>
      <TableCell>
        <input
          type="text"
          value={value.line1}
          onChange={(e) => onChange('line1', e.target.value)}
          placeholder="Address Line 1"
        />
      </TableCell>
      <TableCell>
        <input
          type="text"
          value={value.line2 || ''}
          onChange={(e) => onChange('line2', e.target.value)}
          placeholder="Address Line 2"
        />
      </TableCell>
      <TableCell>
        <input
          type="text"
          value={value.city}
          onChange={(e) => onChange('city', e.target.value)}
          placeholder="City"
        />
      </TableCell>
      <TableCell>
        <input
          type="text"
          value={value.state}
          onChange={(e) => onChange('state', e.target.value)}
          placeholder="State"
        />
      </TableCell>
      <TableCell>
        <input
          type="text"
          value={value.zip}
          onChange={(e) => onChange('zip', e.target.value)}
          placeholder="ZIP"
        />
      </TableCell>
      <TableCell nowrap>
        <AddButton onClick={onSave} />
        <CancelButton onClick={onCancel} />
      </TableCell>
    </tr>
  );
}
