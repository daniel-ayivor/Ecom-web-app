import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  import {Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { UpdateDialog } from "@/Admin/Dialogs/UpdateDialog";
  
  type DataTableProps = {
    data: any[];
    columns: { key: string; label: string }[];
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
  };
  
  export function RegisterTable({ data, columns, onEdit, onDelete }: DataTableProps) {
   

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {data.map((item, index) => (
            <TableRow
              onClick={() => localStorage.setItem("packageId", item?.id)}
              key={index}
            >
              {columns.slice(0, 5).map((column) => (
               <TableCell key={column.key}>
               {column.key === "image" ? (
               <img
               src={`http://localhost:8000/${item?.image}`|| "/fallback-image.jpg"}
               alt={item.title || "Product Image"}
               className="h-10 w-10 border object-cover  rounded-full"
             />
             
               ) : (
                <div className=" text-xs">

                 { item[column.key]}
                </div>
               )}
             </TableCell>
              ))}
              <TableCell>
                <div className="flex items-center gap-2">
                  <UpdateDialog  onClick={() => onEdit?.(item)}/>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit?.(item)}
                  >
                    {/* <EditDialog /> */}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      onDelete?.(item);
                      toast.success("Item deleted successfully!");
                    }}
                  >
                    <Trash2 className="h-4 text-red-400 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </div>
    );
  }
  