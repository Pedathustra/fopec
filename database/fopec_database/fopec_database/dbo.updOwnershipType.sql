use fopec
go

if exists(select * from sys.procedures where name = 'updOwnershipType')
begin 
	drop proc updOwnershipType;
end 
go

create proc updOwnershipType 
	@description varchar(255), 
	@id int
as
begin
	set nocount on;
	
	if exists(select * from ownership_type where [description] = @description and id != @id)
	begin 
		return -1;
	end 

	update ownership_type
	set [description] = @description
	where id = @id;

	return 0
end 
go 

  