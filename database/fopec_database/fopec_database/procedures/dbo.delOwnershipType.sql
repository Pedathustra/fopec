use fopec
go

if exists(select * from sys.procedures where name = 'delOwnershipType')
begin 
	drop proc delOwnershipType;
end 
go

create proc delOwnershipType 
	@id int
as
begin
	set nocount on;
	
	if exists(select * from crowdsourced_research where ownership_type_id = @id ) 
	begin 
		return -1;
	end 

	delete 
	from  ownership_type
	where id = @id;

	return 0
end 
go 

  