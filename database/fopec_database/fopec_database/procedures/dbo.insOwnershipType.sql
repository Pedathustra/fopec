use fopec
go

if exists(select * from sys.procedures where name = 'insOwnershipType')
begin 
	drop proc insOwnershipType;
end 
go

create proc insOwnershipType 
	@description varchar(255)
as
begin
	set nocount on;
	
	if exists(select * from ownership_type where [description] = @description)
	begin 
		return -1
	end 

	insert into ownership_type([description])
	values(@description);

	return 0
end 
go 

  